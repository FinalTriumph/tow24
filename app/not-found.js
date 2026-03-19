export default function NotFound() {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 900, color: '#f5a623' }}>404</h1>
      <p style={{ color: '#888', marginTop: '12px' }}>Page not found.</p>
      <a href="/" style={{ color: '#f5a623', marginTop: '24px', display: 'inline-block' }}>← Go home</a>
    </div>
  );
}
