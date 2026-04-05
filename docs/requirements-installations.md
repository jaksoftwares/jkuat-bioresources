3) Install Core Production Dependencies

These are the main packages your project needs.

npm install \
@supabase/supabase-js \
@supabase/ssr \
cloudinary \
axios \
zod \
react-hook-form \
@hookform/resolvers \
@tanstack/react-query \
zustand \
papaparse \
xlsx \
date-fns \
clsx \
tailwind-merge \
lucide-react \
recharts \
jspdf \
jspdf-autotable



Install UI System (Highly Recommended)

I strongly recommend using shadcn/ui.

This gives you professional reusable components.

npx shadcn@latest init

Choose:

Would you like to use TypeScript? Yes
Style: Default
Base color: Slate
CSS variables: Yes
Components path: components/ui

Then install important components:

npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add dropdown-menu
npx shadcn@latest add sheet
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add toast