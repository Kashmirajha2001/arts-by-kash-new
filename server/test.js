import dns from "node:dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.arts-by-kash.y5fg6l2.mongodb.net"
  );

  console.log(result);
} catch (err) {
  console.log(err);
}