export default function NotFound() {
  return (
    <main className="page">
      <div className="wrap">
        <div className="glass" style={{textAlign: 'center', alignItems: 'center'}}>
          <span className="eyebrow">Erro 404</span>
          <h1>Essa cena não existe</h1>
          <p>O endereço pode ter mudado ou ter sido digitado errado.</p>
          <a href="/" className="btn btn-primary">
            Voltar para o início
          </a>
        </div>
      </div>
    </main>
  );
}
