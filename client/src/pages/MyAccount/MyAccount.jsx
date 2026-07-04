import { useState } from "react";

// import PageHero from "../../components/shared/PageHero/PageHero";
// import HeroImage from "../../assets/images/hero/account-hero.jpg";

import ProfileCard from "./ProfileCard/ProfileCard";
import AccountTabs from "./AccountTabs/AccountTabs";
import WishlistTab from "./WishlistTab/WishlistTab";
import OrdersTab from "./OrdersTab/OrdersTab";
import CoursesTab from "./CoursesTab/CoursesTab";

import styles from "./MyAccount.module.css";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("wishlist");

  return (
    <>
      {/* <PageHero
        title="My Account"
        breadcrumb="Manage your profile, orders and courses"
        image={HeroImage}
      /> */}

      <section className={styles.accountSection}>
        <div className={styles.container}>
          <ProfileCard />

          {/* AccountTabs Coming Next */}
          <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "wishlist" && <WishlistTab />}

          {activeTab === "orders" && <OrdersTab />}

          {activeTab === "courses" && <CoursesTab />}
        </div>
      </section>
    </>
  );
}
