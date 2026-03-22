/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { NewProject } from "./pages/NewProject";
import { ProjectDrafting } from "./pages/ProjectDrafting";
import { ProjectApproval } from "./pages/ProjectApproval";
import { ProjectDeclaration } from "./pages/ProjectDeclaration";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/declare" element={<ProjectDeclaration />} />
          <Route path="projects/:id/draft" element={<ProjectDrafting />} />
          <Route path="projects/:id/approve" element={<ProjectApproval />} />
          <Route path="templates" element={<div className="p-4 text-slate-500">Tính năng Biểu mẫu đang được phát triển</div>} />
          <Route path="settings" element={<div className="p-4 text-slate-500">Tính năng Cài đặt đang được phát triển</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
