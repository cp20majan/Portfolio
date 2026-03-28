# Portfolio Website

Light-themed, multi-page portfolio for a computing student specializing in oil & gas, networking, cybersecurity, and industrial automation.

## Implemented Features

- Multi-page site: Home, Projects, Project Detail, About, Contact, Login, and Admin dashboard.
- Editorial visual system with:
  - Off-white base `#F8F9FB`
  - Steel-blue primary `#2563EB`
  - Crimson secondary `#DC2626`
  - Geometric dot texture background
  - Hover lift effects + soft layered shadows
  - Route/page entrance animation
- Role-based behavior (demo/localStorage-backed):
  - **Guest**: public pages + public projects
  - **Viewer**: published public + authenticated projects
  - **RoleAccessAdmin**: full CRUD via `/admin`
- Project model supports:
  - title, short description, full markdown description
  - tags
  - thumbnail URL
  - attachment entries
  - visibility (public/authenticated)
  - status (draft/published)
  - tech stack + gallery
- Admin dashboard allows:
  - create project entries
  - edit entries
  - delete entries
  - publish/unpublish via status

## Demo Auth Notes

This implementation uses client-side localStorage for demonstration. For production, replace with Supabase/Firebase auth and database:

- Auth: Email/password or magic link
- Role in profile table (`admin`, `viewer`)
- Project/content in PostgreSQL/Firestore
- File uploads in Supabase Storage/Firebase Storage

## Run Locally

Any static server works:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
