import { useEffect, useRef, useState } from "react";
import AddItemModal from "./AddItemModal";

const BASE_URL = "https://chimera-ass1-default-rtdb.firebaseio.com/universes";
const PAGE_SIZE = 5;
const POLL_INTERVAL = 3000;

export default function UniverseTab({ universe }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(
    () => Number(localStorage.getItem(`${universe}-page`)) || 1
  );
  const [freeze, setFreeze] = useState(
    () => JSON.parse(localStorage.getItem(`${universe}-freeze`)) || false
  );
  const [hasActivity, setHasActivity] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const bufferRef = useRef([]);
  const lastSnapshotRef = useRef({});
  const listRef = useRef(null);
  const pollRef = useRef(null);

  const isOnlineRef = useRef(navigator.onLine);
  const offlineQueueRef = useRef(
    JSON.parse(localStorage.getItem(`${universe}-offline-queue`)) || []
  );

  // Pagination helper
  const paginate = (list, pageNum) => {
    const start = (pageNum - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  };

  // Fetch data from Firebase
  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${universe}/items.json`);
      const data = (await res.json()) || {};

      // Convert Firebase object to array safely
      const itemsArray = Object.keys(data || {}).map((key) => ({
        id: key,
        name: data[key]?.name|| data[key]?.event|| "Unnamed",
        createdAt: data[key]?.createdAt || Date.now(),
      }));

      // Sort newest first
      const sorted = itemsArray.sort((a, b) => b.createdAt - a.createdAt);

      // Handle freeze mode
      if (freeze) {
        bufferRef.current = sorted;
      } else {
        setItems(paginate(sorted, page));
      }

      // Show activity pulse
      const lastKeys = Object.keys(lastSnapshotRef.current || {});
      setHasActivity(lastKeys.length !== Object.keys(data || {}).length);
      lastSnapshotRef.current = data;
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  // Polling effect
  useEffect(() => {
    fetchData();
    pollRef.current = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [universe, page, freeze]);

  // Flush buffer when unfreezing
  useEffect(() => {
    if (!freeze && bufferRef.current.length) {
      setItems(paginate(bufferRef.current, page));
      bufferRef.current = [];
      setHasActivity(false);
    }
  }, [freeze, page]);

  // Persist page and freeze state
  useEffect(() => {
    localStorage.setItem(`${universe}-page`, page);
    localStorage.setItem(`${universe}-freeze`, freeze);
  }, [page, freeze]);

  // Restore scroll position
  useEffect(() => {
    const savedScroll = Number(localStorage.getItem(`${universe}-scroll`)) || 0;
    if (listRef.current) listRef.current.scrollTop = savedScroll;
  }, []);

  const handleScroll = () => {
    if (listRef.current)
      localStorage.setItem(`${universe}-scroll`, listRef.current.scrollTop);
  };

  // Create new item
  const createItem = async (data) => {
    const payload = { ...data, createdAt: Date.now() };

    if (!isOnlineRef.current) {
      offlineQueueRef.current.push(payload);
      localStorage.setItem(
        `${universe}-offline-queue`,
        JSON.stringify(offlineQueueRef.current)
      );
      setItems((prev) => [payload, ...prev]);
      return;
    }

    await fetch(`${BASE_URL}/${universe}/items.json`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="universe-tab">
      <div className="controls">
        <button className="freeze-btn" onClick={() => setFreeze((f) => !f)}>
          {freeze ? "Unfreeze Time" : "Freeze Time"}
        </button>
        {hasActivity && <span className="pulse-dot" />}
      </div>

      <div className="list" ref={listRef} onScroll={handleScroll}>
        {items.map((item) => (
          <div key={item.id} className="item">
            {item.name}
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ padding: "10px", color: "#888" }}>No items yet.</div>
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      <button className="add-item" onClick={() => setShowModal(true)}>
        Add Item
      </button>

      {showModal && (
        <AddItemModal
          onSubmit={(data) => {
            createItem(data);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
