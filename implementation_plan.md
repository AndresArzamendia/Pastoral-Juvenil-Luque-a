# Implementation Plan: Aesthetic & Functional Revamp 🎨✨

## Goal Description
The objective is to elevate the visual quality and "liveness" of the Pastoral Juvenil Luqueña website and its Administrative Panel. The user wants everything to look stunning, with beautiful animations, a highly polished Google Calendar integration in the Agenda, and a redesigned Admin dashboard that includes a well-designed color palette tool (with liturgical color presets) while fixing the current panel's aesthetics.

## Proposed Changes

### `src/app/globals.css`
- **Animations & Interactivity:** Add refined scroll-driven animations (`.reveal.visible`) instead of static on-mount animations. Add glassmorphic utility classes (`.glass-panel`) for premium UI.
- **Improved Variables:** Add support for subtle glowing effects, rich gradients, and soft shadows. 
- **Calendar & Iframe Layouts:** Add a wrapper to make the Google Calendar look like it's inside a beautiful floating card with soft pulsing borders.
- **Admin Panel Polish:** Overhaul the admin `.admin-shell`, `.admin-sidebar`, and `.pjl-card` to look incredibly premium.

### `src/app/page.tsx`
- **Intersection Observer Hook:** Implement a custom `useIntersectionObserver` or simple `useEffect` to trigger `.reveal` elements as the user scrolls down, making the page feel "alive".
- **Agenda Enhancements:** Restructure the Agenda layout to elegantly display the Google Calendar iframe. Add contextual visual flair (like lit buttons, animated dots along the timeline).
- **Interactivity:** Ensure all tabs and dropdowns react beautifully to hovers.

### `src/app/admin/page.tsx`
- **Login screen overhaul:** Make it look stunning with animated gradient backgrounds and a sleek glass card.
- **Liturgical Color Presets:** In the 'Apariencia' module, add quick-select preset colors for Liturgical Seasons:
  - 🟩 Tiempo Ordinario (Verde)
  - 🟪 Cuaresma / Adviento (Morado)
  - 🟥 Pentecostés / Mártires (Rojo)
  - ⬜ Pascua / Navidad (Blanco / Dorado)
- **Table & Layout Adjustments:** Give tables rounded corners, soft row hovers, and a cleaner padding structure holding everything together beautifully inside the `main` layout.

## Verification Plan
1. Launch development server.
2. Verify scrolling down the public page triggers elements gracefully.
3. Verify the Google Calendar in tracking "Agenda" is beautifully formatted, responsive, and functional.
4. Verify the Admin panel looks professional and the liturgical color presets correctly trigger updates across the app.
