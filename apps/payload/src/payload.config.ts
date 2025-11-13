// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './common/Users'
import { Association } from './intro/Association'
import { Contact } from './intro/Contact'
import { Media } from './common/Media'
import { Person } from './intro/Person'
import { FAQQuestion } from './intro/FAQQuestion'
import { FAQ } from './intro/FAQ'
import { Supermentor } from './intro/Supermentor'
import { Hero } from './intro/Hero'
import { Information } from './intro/Information'
import { Signup } from './intro/Signup'
import { SmallPrint } from './intro/SmallPrint'
import { Theme } from './intro/Theme'
import { Ad } from './radio/Ad'
import { BoardMessage } from './radio/BoardMessage'
import { Quote } from './radio/Quote'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ["./app/(components)/Deploy"],
      graphics: {
        Icon: "./app/(components)/Icon",
        Logo: "./app/(components)/Logo"
      }
    }
  },
  collections: [Users, Media, Person, FAQQuestion, Supermentor, Ad, BoardMessage, Quote],
  globals: [Association, Contact, FAQ, Hero, Information, Signup, SmallPrint, Theme],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  cors: ["http://localhost:5173"]
})
