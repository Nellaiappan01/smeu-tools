export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">⚙ Settings</h2>
      <form className="bg-white p-6 rounded-xl shadow space-y-4 max-w-lg">
        <div>
          <label className="block mb-2 font-semibold">Site Title</label>
          <input type="text" className="w-full p-2 border rounded" defaultValue="SMEU Tools"/>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Admin Email</label>
          <input type="email" className="w-full p-2 border rounded" defaultValue="admin@smeu.com"/>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Theme</label>
          <select className="w-full p-2 border rounded">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
