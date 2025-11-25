This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies with [pnpm](https://pnpm.io/) (already set up by the scaffold), then run the development server (configured to use port `2612`):

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity CMS setup

1. Copy `.env.example` to `.env.local` (already created with your project values) and confirm the `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_READ_TOKEN`, and `SANITY_REVALIDATE_SECRET` variables match your Sanity project (`l1riut3x`).
2. Seed content in Sanity Studio by running `pnpm studio` and navigating to [http://localhost:3333](http://localhost:3333) or open the embedded studio at [http://localhost:2612/studio](http://localhost:2612/studio) while the Next.js dev server runs.
3. Use the provided document types (`Homepage Hero`, `Service`, `Process Step`, `Testimonial`, `Gallery Entry`, `Blog Post`) to manage all dynamic copy and assets. Before/after images should be uploaded here—or reference Cloudinary URLs when you’re ready—and tied to gallery entries.
4. Wire the GROQ queries in `src/lib/sanity.queries.ts` into your pages (home, gallery, blog) to replace the current placeholder arrays. Import the `sanityClient` from `src/lib/sanity.client.ts` inside server components to fetch data.
5. Configure a webhook in Sanity (project settings → API → Webhooks) that hits `/api/revalidate?secret=SANITY_REVALIDATE_SECRET` once you implement that route in Next.js. This will keep ISR pages fresh whenever content changes.

## Media (Cloudinary)

1. Create unsigned upload preset(s) in Cloudinary (this project uses `flawless` inside the `djzvgtp09` cloud). Add the following environment variables for both local dev and Vercel: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
2. Gallery entries in Sanity currently store Cloudinary URLs for before/after shots. Use the Studio (or the Cloudinary Media Library) to upload new images, then paste the secure URL into the gallery entry.
3. All Unsplash references have been removed; every fallback and metadata image now points to Cloudinary (`res.cloudinary.com/djzvgtp09`). Remember to keep that domain in `next.config.ts` if you change clouds.

## Next steps for the carpet cleaning site

- **Sanity CMS**: Create a Sanity project with datasets for hero copy, services, blog posts, and gallery entries. Install `next-sanity`, generate a read token, and define simple schemas so the content studio is approachable for non-technical editors. Add the studio either as an embedded route (protected with auth) or host it separately.
- **Cloudinary gallery**: Create a Cloudinary account, generate an upload preset, and store the credentials in `.env.local`. When defining Sanity gallery documents, persist the Cloudinary public IDs so the front end can build optimized URLs for the Next.js `<Image>` component.
- **Resend contact form**: Add a server action or route handler (e.g., `app/api/contact/route.ts`) that validates submissions and calls Resend with your sister's inbox as the destination. Keep the API key in `.env.local` and enable [Resend domains](https://resend.com/domains) for better deliverability.
- **SEO & metadata**: Configure shared metadata in `src/app/layout.tsx`, add Open Graph/Twitter cards for the home, gallery, and blog routes, and include structured data (LocalBusiness, FAQ) where appropriate.
- **Deployment**: Connect the repo to Vercel. Configure environment variables for Sanity, Cloudinary, and Resend in the Vercel dashboard. Enable preview deployments so content and UI changes can be reviewed before going live.
