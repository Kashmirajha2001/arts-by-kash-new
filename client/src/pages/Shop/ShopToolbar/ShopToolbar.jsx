import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";

import styles from "./ShopToolbar.module.css";

export default function ShopToolbar({ search, setSearch, sort, setSort, setFilterOpen, setSortOpen }) {
  return (
    <section className={styles.toolbar}>
      <div className={styles.searchBox}>
        <SearchRoundedIcon />

        <input
          type="text"
          placeholder="Search artworks, prints or courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.mobileActions}>
        <button
          className={styles.actionButton}
          onClick={() => setFilterOpen(true)}
        >
          <TuneRoundedIcon />
          <span>Filters</span>
        </button>

        <button
          className={styles.actionButton}
          onClick={() => setSortOpen(true)}
        >
          <SwapVertRoundedIcon />
          <span>Sort</span>
        </button>
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={styles.sort}
      >
        <option value="latest">Latest</option>
        <option value="low-high">Price : Low to High</option>
        <option value="high-low">Price : High to Low</option>
        <option value="name">Name (A-Z)</option>
      </select>
    </section>
  );
}
