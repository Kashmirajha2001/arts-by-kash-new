export default function Container({ children }) {
  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      {children}
    </div>
  );
}