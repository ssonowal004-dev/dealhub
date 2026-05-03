"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Link,
  Bell,
  Palette,
  Shield,
  Save,
  Check,
  Loader2,
  Globe,
  Mail,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("affiliate");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const [settings, setSettings] = useState({
    amazonTag: "dealhub0a-21",
    flipkartId: "dealhub01",
    siteName: "DealHub",
    siteDescription: "Smart Deals from Amazon & Flipkart",
    primaryColor: "#6366f1",
    accentColor: "#f59e0b",
    autoSync: true,
    syncInterval: "6",
    emailNotifications: true,
    priceDropAlerts: true,
    newProductAlerts: false,
    analyticsEnabled: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const tabs = [
    { id: "affiliate", label: "Affiliate Links", icon: Link },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "general", label: "General", icon: Settings },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-text">Settings</h1>
        <p className="text-text-muted mt-1">Manage your affiliate settings and preferences</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-surface-light border border-border text-text-muted hover:text-text"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="glass rounded-2xl p-6 space-y-6"
      >
        {/* Affiliate Settings */}
        {activeTab === "affiliate" && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ff9900]/10 flex items-center justify-center">
                <span className="text-lg font-bold text-[#ff9900]">a</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Amazon Associates</h3>
                <p className="text-sm text-text-muted">Configure your Amazon affiliate settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Associate Tag</label>
                <input
                  type="text"
                  value={settings.amazonTag}
                  onChange={(e) => setSettings(prev => ({ ...prev, amazonTag: e.target.value }))}
                  placeholder="yourtag-21"
                  className="w-full input-field"
                />
                <p className="text-xs text-text-muted mt-1">Your Amazon Associates tracking ID</p>
              </div>

              <div className="p-4 rounded-xl bg-[#ff9900]/5 border border-[#ff9900]/10">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#ff9900] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Amazon PA API</p>
                    <p className="text-xs text-text-muted mt-1">
                      Connect your Amazon Product Advertising API credentials for automatic product syncing.
                      This requires 3 qualifying sales within 180 days.
                    </p>
                    <button className="mt-3 text-sm text-[#ff9900] hover:underline">
                      Configure API Access →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#2874f0]/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#2874f0]">fk</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">Flipkart Affiliate</h3>
                  <p className="text-sm text-text-muted">Configure your Flipkart affiliate settings</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Affiliate ID</label>
                  <input
                    type="text"
                    value={settings.flipkartId}
                    onChange={(e) => setSettings(prev => ({ ...prev, flipkartId: e.target.value }))}
                    placeholder="your-affiliate-id"
                    className="w-full input-field"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#2874f0]/5 border border-[#2874f0]/10">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#2874f0] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-text">Flipkart API</p>
                      <p className="text-xs text-text-muted mt-1">
                        Connect Flipkart affiliate API for automatic product feeds and deal updates.
                      </p>
                      <button className="mt-3 text-sm text-[#2874f0] hover:underline">
                        Configure API Access →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Appearance */}
        {activeTab === "appearance" && (
          <>
            <h3 className="text-lg font-semibold text-text mb-6">Theme Customization</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-12 rounded-xl border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1 input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-12 h-12 rounded-xl border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.accentColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="flex-1 input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-light">
                <p className="text-sm font-medium text-text mb-3">Preview</p>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: settings.primaryColor }}>
                    Primary Button
                  </button>
                  <span className="text-sm font-medium" style={{ color: settings.accentColor }}>
                    Accent Text
                  </span>
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: settings.primaryColor + "20" }} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <>
            <h3 className="text-lg font-semibold text-text mb-6">Notification Preferences</h3>

            <div className="space-y-4">
              {[
                { id: "emailNotifications", label: "Email Notifications", desc: "Receive email updates about your account", icon: Mail },
                { id: "priceDropAlerts", label: "Price Drop Alerts", desc: "Get notified when products drop in price", icon: Bell },
                { id: "newProductAlerts", label: "New Product Alerts", desc: "Get notified when new products are added", icon: Globe },
              ].map((item) => {
                const Icon = item.icon;
                const isEnabled = settings[item.id as keyof typeof settings] as boolean;
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-light">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{item.label}</p>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSettings(prev => ({ ...prev, [item.id]: !isEnabled }))}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        isEnabled ? "bg-accent-green" : "bg-surface-light border border-border"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                        isEnabled ? "translate-x-7" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* General */}
        {activeTab === "general" && (
          <>
            <h3 className="text-lg font-semibold text-text mb-6">General Settings</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Site Description</label>
                <input
                  type="text"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  className="w-full input-field"
                />
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-semibold text-text mb-4">Auto-Sync Settings</h4>

                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-light mb-4">
                  <div>
                    <p className="text-sm font-medium text-text">Automatic Product Sync</p>
                    <p className="text-xs text-text-muted">Automatically sync products from APIs</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, autoSync: !prev.autoSync }))}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      settings.autoSync ? "bg-accent-green" : "bg-surface-light border border-border"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                      settings.autoSync ? "translate-x-7" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Sync Interval (hours)</label>
                  <select
                    value={settings.syncInterval}
                    onChange={(e) => setSettings(prev => ({ ...prev, syncInterval: e.target.value }))}
                    className="w-full input-field"
                  >
                    <option value="1">Every 1 hour</option>
                    <option value="3">Every 3 hours</option>
                    <option value="6">Every 6 hours</option>
                    <option value="12">Every 12 hours</option>
                    <option value="24">Every 24 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Save Button */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : showSaved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}