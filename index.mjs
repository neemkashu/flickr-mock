import pkg from 'json-server';
const { create, router, defaults } = pkg;
const server = create()
const JSrouter = router('./src/db.json')
const middlewares = defaults()

server.use(middlewares)
server.use(JSrouter)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})