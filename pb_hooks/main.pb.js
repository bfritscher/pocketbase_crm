routerAdd("GET", "/search_email", (c) => {
    const search = c.queryParam("q");
    const record = $app.dao().findFirstRecordByFilter(
        "contacts", "email = {:search}",
        { search: search.toLowerCase() },
    );
    const request = c.request();
    const data = JSON.parse(JSON.stringify(record));
    const url = `${c.scheme()}://${request.host}/_/#/collections?collectionId=${data.collectionId}&recordId=${data.id}`;
    data.url = url;
    return c.json(200, data);
}, $apis.activityLogger($app),
$apis.requireAdminAuth()
)
