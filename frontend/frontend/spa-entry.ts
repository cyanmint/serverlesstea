// Copyright 2026 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

// Standalone SPA entry point.
// Loads the Gitea theme and UI module CSS that is normally injected by the
// Go binary in embedded mode, then mounts the Vue application.
// Only imported by the GitHub Pages / standalone build (vite.frontend.config.ts).

import '../web_src/css/spa.css';
import '../web_src/js/spa/main.ts';
