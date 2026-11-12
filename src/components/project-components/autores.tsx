import { useState } from "react";

// Coloque as três fotos em public/autores/ com estes nomes (ou ajuste os caminhos abaixo).
const autores = [
  {
    nome: "Seu Nome",
    papel: "Autor",
    descricao: "Pesquisador e desenvolvedor do atlas.",
    foto: "/autores/autor.jpg",
  },
  {
    nome: "Nome do Colega",
    papel: "Autor",
    descricao: "Pesquisador e coautor do atlas.",
    foto: "/autores/colega.jpg",
  },
  {
    nome: "Nome do Coordenador",
    papel: "Coordenador",
    descricao: "Coordenação e orientação da pesquisa.",
    foto: "/autores/coordenador.jpg",
  },
];

function Foto({ src, nome }: { src: string; nome: string }) {
  const [erro, setErro] = useState(false);
  const iniciais = nome
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (erro) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100 font-display text-4xl font-bold text-slate-500">
        {iniciais}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={nome}
      onError={() => setErro(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function Autores() {
  return (
    <section id="autores" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            Equipe
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Autores
          </h2>
          <p className="mt-3 text-slate-600">
            Quem está por trás da pesquisa e do desenvolvimento do atlas.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {autores.map((a) => (
            <article
              key={a.nome}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
                <Foto src={a.foto} nome={a.nome} />
              </div>
              <div className="p-5 text-center">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    a.papel === "Coordenador"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {a.papel}
                </span>
                <h3 className="font-display mt-3 text-xl font-bold text-slate-900">
                  {a.nome}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{a.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
