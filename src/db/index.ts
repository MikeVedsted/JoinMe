import { Pool } from 'pg'
import { PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT } from '../../src/util/secrets'

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PW,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

export default {
  async query(text: string, params?: any[]) {
    // const start = Date.now()
    const res = await pool.query(text, params)
    // const duration = Date.now() - start
    // console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  },
  async getClient() {
    const client: any = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args: any) => {
      client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }
}
