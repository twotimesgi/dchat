import clientPromise from "../../mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("event-dapp");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      let myEvent = await db.collection("events").insertOne(bodyObject);
      res.json(myEvent.ops[0]);
      break;
    case "GET":
      const allEvents = await db.collection("events").find({}).toArray();
      res.json({ status: 200, data: allEvents });
      break;
  }
}
