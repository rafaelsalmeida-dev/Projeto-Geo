import { useEffect, useState } from "react";
import "./App.css";

import comunidades_gerais from "./data/comunidades_gerais.json";
import ComunidadesGerais from "./comunidadesGerais";
import ComunidadesTurcas from "./comunidadesTurcas";
import ComunidadesCristas from "./comunidadesCristas";
import comunidades_turcas_metadados from "./data/comunidades_turcas_metadados.json";
import chipre_inteiro_metadados from "./data/chipre_inteiro_metadados.json";
import comunidades_cristas_metadados from "./data/comunidades_cristas_metadados.json";
import Globo from "./globo";
import Navbar from "./components/project-components/navbar";
import Autores from "./components/project-components/autores";
import LegendaOcupadas from "./components/project-components/legendaOcupadas";
import LegendaCristas from "./components/project-components/legendaCristas";
import LegendaGerais from "./components/project-components/legendaGerais";

type Camada = "gerais" | "turcas" | "cristas";

const camadas: {
  id: Camada;
  label: string;
  descricao: string;
  ativo: string;
  dot: string;
}[] = [
  {
    id: "gerais",
    label: "Chipre De jure",
    descricao: "Todos os topônimos reconhecidos internacionalmente.",
    ativo: "bg-blue-600 text-white shadow-blue-600/30",
    dot: "bg-blue-500",
  },
  {
    id: "turcas",
    label: "Comunidades ocupadas",
    descricao: "Topônimos modificados na região ocupada.",
    ativo: "bg-red-600 text-white shadow-red-600/30",
    dot: "bg-red-500",
  },
  {
    id: "cristas",
    label: "Comunidades cristãs",
    descricao: "Topônimos cristãos analisados na pesquisa.",
    ativo: "bg-orange-500 text-white shadow-orange-500/30",
    dot: "bg-orange-500",
  },
];

function App() {
  const [geoData, setGeoData] = useState<any>();
  const [comunidade, setComunidade] = useState<Camada>("gerais");
  const [globoFinalizado, setGloboFinalizado] = useState(false);

  useEffect(() => {
    if (globoFinalizado) {
      setGeoData(comunidades_gerais);
    }
  }, [globoFinalizado]);

  function handleGeoData(nome: Camada) {
    switch (nome) {
      case "turcas":
        setComunidade("turcas");
        setGeoData(comunidades_turcas_metadados);
        break;
      case "gerais":
        setComunidade("gerais");
        setGeoData(comunidades_gerais);
        break;
      case "cristas":
        setComunidade("cristas");
        setGeoData(comunidades_cristas_metadados);
        break;
    }
  }

  if (!globoFinalizado) {
    return <Globo onFinish={() => setGloboFinalizado(true)} />;
  }

  const atual = camadas.find((c) => c.id === comunidade)!;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section id="inicio" className="hero-bg scroll-mt-20">
          <div className="mx-auto max-w-4xl px-5 pb-16 pt-14 text-center fade-up md:pt-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-orange-500" />
              Atlas interativo
            </span>
            <h1 className="font-display mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Atlas toponímico digital da{" "}
              <span className="bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
                República de Chipre
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 md:text-lg">
              Explore os topônimos das comunidades cipriotas, compare as
              mudanças feitas na região ocupada e conheça a motivação de cada
              nome.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#atlas"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-blue-700"
              >
                Explorar o atlas
              </a>
              <a
                href="#autores"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
              >
                Conhecer os autores
              </a>
            </div>
          </div>
        </section>

        {/* Atlas */}
        <section id="atlas" className="scroll-mt-20 pb-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">
                  Atlas
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${atual.dot}`} />
                  {atual.descricao}
                </p>
              </div>

              <div
                role="tablist"
                className="grid grid-cols-1 gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:grid-cols-3 sm:rounded-full"
              >
                {camadas.map((c) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={comunidade === c.id}
                    onClick={() => handleGeoData(c.id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                      comunidade === c.id
                        ? `${c.ativo} shadow-lg`
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
              <div className="map-water relative w-full">
                {geoData ? (
                  comunidade === "gerais" ? (
                    <div>
                      <ComunidadesGerais geoData={geoData} />
                    </div>
                  ) : comunidade === "turcas" ? (
                    <div className="flex flex-col">
                      <ComunidadesTurcas
                        turcasData={geoData}
                        base_layer={chipre_inteiro_metadados}
                      />
                    </div>
                  ) : (
                    <div>
                      <ComunidadesCristas
                        cristasData={geoData}
                        second_base_layer={comunidades_turcas_metadados}
                        base_layer={chipre_inteiro_metadados}
                      />
                    </div>
                  )
                ) : (
                  <p className="p-10 text-center text-slate-600">
                    Carregando mapa...
                  </p>
                )}
              </div>

              <div className="border-t border-slate-200 bg-white px-5 py-4">
                {comunidade === "gerais" && <LegendaGerais />}
                {comunidade === "turcas" && <LegendaOcupadas />}
                {comunidade === "cristas" && <LegendaCristas />}
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              Passe o mouse sobre uma comunidade para ver o nome
              {comunidade !== "gerais" && " e clique para ver os detalhes"}.
            </p>
          </div>
        </section>

        <Autores />
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 py-8 text-center text-sm text-slate-400">
        <p className="font-display text-lg font-bold text-white">
          Geo<span className="text-blue-400">Cart</span>
        </p>
        <p className="mt-1">
          Atlas toponímico digital da República de Chipre ©{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
