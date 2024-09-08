routerAdd(
  "GET",
  "/search_email",
  (c) => {
    const info = $apis.requestInfo(c);
    $app
      .dao()
      .findFirstRecordByFilter("groups", "name = 'heg' && members.id ?={:id}", {
        id: info.authRecord.id,
      });

    const search = c.queryParam("q");
    const record = $app
      .dao()
      .findFirstRecordByFilter("contacts", "email = {:search}", {
        search: search.toLowerCase(),
      });
    const request = c.request();
    const data = JSON.parse(JSON.stringify(record));
    try {
      const record = $app
      .dao()
      .findFirstRecordByFilter("photos", "matricule = {:matricule}", {
        matricule: data.matricule,
      });
      data.photo = record.getString("base64");
    } catch (e) {
      // ignore no photo found
    }
    data._meta= {
      resource_url: `${c.scheme()}://${request.host}/api/collections/contacts/records/${data.id}`,
      fields: ['firstname', 'lastname', 'email', 'matricule', 'title', 'info'],
      textarea: ['info'],
    };
    return c.json(200, data);
  },
  $apis.activityLogger($app),
  $apis.requireRecordAuth()
);
