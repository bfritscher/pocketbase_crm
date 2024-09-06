routerAdd(
  "GET",
  "/search_email",
  (c) => {
    const search = c.queryParam("q");
    const record = $app
      .dao()
      .findFirstRecordByFilter("contacts", "email = {:search}", {
        search: search.toLowerCase(),
      });
    const request = c.request();
    const data = JSON.parse(JSON.stringify(record));

    try {
      const file = $filesystem.fileFromPath(
        `${$app.dataDir()}/students/${data.matricule}.jpg`
      );
      const reader = file.reader.open();
      let buffer = new Uint8Array(file.size);
      reader.read(buffer);

      // GPT 4o check for alternative or errors?
      function base64Encode(uint8Array) {
        const base64Chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        let output = "";
        let padding = "";

        const length = uint8Array.length;

        // Add padding if necessary
        if (length % 3 === 1) {
          padding = "==";
        } else if (length % 3 === 2) {
          padding = "=";
        }

        const fullChunksLength = length - (length % 3);

        // Process each chunk of 3 bytes
        for (let i = 0; i < fullChunksLength; i += 3) {
          let triplet =
            (uint8Array[i] << 16) |
            (uint8Array[i + 1] << 8) |
            uint8Array[i + 2];

          // Map each 6-bit segment to the corresponding base64 character
          output += base64Chars[(triplet >> 18) & 0x3f];
          output += base64Chars[(triplet >> 12) & 0x3f];
          output += base64Chars[(triplet >> 6) & 0x3f];
          output += base64Chars[triplet & 0x3f];
        }

        // Handle remaining 1 or 2 bytes and add padding
        if (padding.length > 0) {
          let lastTriplet =
            (uint8Array[fullChunksLength] << 16) |
            (length % 3 === 2 ? uint8Array[fullChunksLength + 1] << 8 : 0);

          output += base64Chars[(lastTriplet >> 18) & 0x3f];
          output += base64Chars[(lastTriplet >> 12) & 0x3f];

          if (length % 3 === 2) {
            output += base64Chars[(lastTriplet >> 6) & 0x3f];
            output += "=";
          } else {
            output += "==";
          }
        }

        return output;
      }
      const base64Image = base64Encode(buffer);
      const mimeType = "image/jpeg"; // Customize to your file type
      const base64ImageWithMimeType = `data:${mimeType};base64,${base64Image}`;
      data.photo = base64ImageWithMimeType;
    } catch (e) {
        // ignore no photo found
    }

    const url = `${c.scheme()}://${request.host}/_/#/collections?collectionId=${
      data.collectionId
    }&recordId=${data.id}`;
    data.url = url;
    return c.json(200, data);
  },
  $apis.activityLogger($app),
  $apis.requireAdminAuth()
);
