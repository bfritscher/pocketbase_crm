routerAdd(
  "GET",
  "/search",
  (c) => {
    const info = $apis.requestInfo(c);
    // fails if user is not in the group
    $app
      .dao()
      .findFirstRecordByFilter("groups", "name = 'heg' && members.id ?={:id}", {
        id: info.authRecord.id,
      });

    const search = c.queryParam("q");
    const records = $app
      .dao()
      .findRecordsByExpr(
        "contacts",
        $dbx.exp(
          "LOWER(email) = {:search} OR LOWER(firstname) LIKE {:searchLike} OR LOWER(lastname) LIKE {:searchLike} OR LOWER(title) LIKE {:searchLike} OR LOWER(info) LIKE {:searchLike}",
          {
            search: search.toLowerCase(),
            searchLike: `%${search.toLowerCase()}%`,
          }
        )
      );
    const request = c.request();
    const results = JSON.parse(JSON.stringify(records));
    for (const data of results) {
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
      data._meta = {
        resource_url: `${c.scheme()}://${
          request.host
        }/api/collections/contacts/records/${data.id}`,
        fields: ["firstname", "lastname", "email", "matricule", "title", "info"],
        textarea: ["info"],
      };  
    }
    
    return c.json(200, results);
  },
  $apis.activityLogger($app),
  $apis.requireRecordAuth()
);
