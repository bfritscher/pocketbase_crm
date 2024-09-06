/* globals PocketBase, document, fetch, console, URL */

function getStudents() {
  return [...document.querySelectorAll("#ETUDIANTS_CLASSE_data_panel table tr")]
    .slice(2)
    .map((row) => {
      return {
        matricule_isa: row.children[0].innerText,
        lastname: row.children[1].innerText,
        firstname: row.children[2].innerText,
        birthdate: row.children[3].innerText,
        gender: row.children[4].innerText,
        status: row.children[5].innerText,
        email: row.children[6].innerText,
        ex_date: row.children[7].innerText,
      };
    });
}

function getImgs() {
  return [...document.querySelectorAll(".a-CardView-mediaImg")].map(
    (img) => img.src
  );
}

function toDataURL(url) {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
}

function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

async function download(url, filename) {
  const a = document.createElement("a");
  a.href = await toDataURL(url);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return;
}

async function parse(PocketBase) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  await pb.admins.authWithPassword("boris.fritscher@he-arc.ch", "PASSWORD");
  const students = getStudents();
  const imgs = getImgs();
  if (imgs.length !== students.length) return console.log("ERROR", imgs.length, students.length);
  const json = {
    year: document.querySelector("header .t-Button-label").innerText,
    class: document.querySelector("h1.t-HeroRegion-title").innerText,
    students: students,
  };
  for (const student of students) {
    const data = {
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      matricule: student.matricule_isa,
      title: json.class,
      info: student.status
    };
    try {
      await pb.collection("contacts").create(data);
    } catch (e) {
      try {
        const record = await pb.collection('contacts').getFirstListItem(`email="${student.email}"`);
        await pb.collection('contacts').update(record.id, data);
      } catch (e) {
        console.log(e);
      }

    }
  }
  for (let i = 0; i < imgs.length; i++) {
    console.log('download', student);
    await download(imgs[i], `${students[i].matricule_isa}.jpg`);
    await wait(500);
    console.log('done');
  }
  console.log('done', imgs.length);
  return;
}

function loadPocketBaseAndParse() {
  import('https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/dist/pocketbase.es.js').then(m => parse(m.default))
}

loadPocketBaseAndParse();
