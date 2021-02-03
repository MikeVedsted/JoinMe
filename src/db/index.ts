import { Pool } from 'pg'

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://clktlxpxwnuhjp:19f0b8150de43685550006d6973ea2c8adcacd3c2569c1714b598590fd525725@ec2-79-125-64-18.eu-west-1.compute.amazonaws.com:5432/d8h15kl4r6bbh',
  ssl: {
    rejectUnauthorized: false
  }
})

export default {
  async query(text: string, params?: any[]) {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
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
