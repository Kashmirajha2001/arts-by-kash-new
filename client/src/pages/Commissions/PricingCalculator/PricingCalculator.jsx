import { useState } from "react";
import MediumSelector from "./MediumSelector/MediumSelector";
import PriceCard from "./PriceCard/PriceCard";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import Section from "../../../components/ui/Section/Section";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Straighten from "@mui/icons-material/Straighten";
import Group from "@mui/icons-material/Group";
import pricing from "../data/pricingData";
import styles from "./PricingCalculator.module.css";
import PointsTobeNoted from "./PointsTobeNoted/PointsTobeNoted";
import CommissionModal from "./CommissionModal/CommissionModal";

export default function PricingCalculator() {
  const [medium, setMedium] = useState("color");
  const [size, setSize] = useState("A4");
  const [people, setPeople] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculatePrice = () => {
    if (medium === "acrylic") return null;
    const selected = pricing[medium].sizes[size];
    if (people === 1) return selected.single;
    if (people === 2) return selected.couple;
    return selected.couple + (people - 2) * selected.extra;
  };

  return (
    <section className={styles.container}>
      <Section>
        <div className={styles.heading}>
          <SectionTitle>Calculate Your Portrait Price</SectionTitle>
          <p>
            Select your preferred medium, artwork size and number of people to
            get an instant price estimate.
          </p>
        </div>

        <div className={styles.content}>
          {/* LEFT: medium selector + dropdowns */}
          <div className={styles.left}>
            <MediumSelector medium={medium} setMedium={setMedium} />

            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label>2. Paper Size</label>
                <div className={styles.selectWrapper}>
                  <Straighten className={styles.selectIcon} />
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    <option value="A2">A2</option>
                  </select>
                  <KeyboardArrowDownIcon className={styles.arrow} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>3. Number of People</label>
                <div className={styles.selectWrapper}>
                  <Group className={styles.selectIcon} />
                  <select
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                  >
                    <option value={1}>Single</option>
                    <option value={2}>Couple</option>
                    <option value={3}>3 People</option>
                    <option value={4}>4 People</option>
                    <option value={5}>5 People</option>
                  </select>
                  <KeyboardArrowDownIcon className={styles.arrow} />
                </div>
              </div>
            </div>

            {/* <div className={styles.notesWrapper}>
              <PointsTobeNoted />
            </div> */}
          </div>

          {/* PRICE CARD — wrapper lets us center it on tablet */}
          <div className={styles.priceCardWrapper}>
            <PriceCard
              medium={medium}
              size={size}
              people={people}
              price={calculatePrice()}
              onBook={() => setIsModalOpen(true)}
            />
          </div>

          {/* NOTES — now a sibling so it can be ordered after PriceCard */}
          <div className={styles.notesWrapper}>
            <PointsTobeNoted />
          </div>

          <CommissionModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            medium={medium}
            size={size}
            people={people}
            price={calculatePrice()}
          />

        </div>
      </Section>
    </section>
  );
}
