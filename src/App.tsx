/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RouteProvider } from './context/RouteContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { PlanPage } from './pages/PlanPage';
import { RoutePage } from './pages/RoutePage';
import { GoPage } from './pages/GoPage';
import { WishlistPage } from './pages/WishlistPage';
import { SummaryPage } from './pages/SummaryPage';
import { SettingsPage } from './pages/SettingsPage';
import { DesignSystemPage } from './pages/DesignSystemPage';

export default function App() {
  return (
    <RouteProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/route" element={<RoutePage />} />
            <Route path="/go" element={<GoPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/design" element={<DesignSystemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RouteProvider>
  );
}
