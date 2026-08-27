export type Exhibitor = {
  name: string;
  category: string;
  image: string;
};

const media = "/media/expositores";

export const exhibitors: Exhibitor[] = [
  { name: "GOL TÊXTIL", category: "INDÚSTRIA TÊXTIL", image: `${media}/gol textil.jpg.jpeg` },
  { name: "DISTRIBUIDOR DE CAMISETAS", category: "FORNECEDOR", image: `${media}/distribuidor de camisetas.jpg.jpeg` },
  { name: "ECOMMERCE VERSO", category: "ECOMMERCE", image: `${media}/ecommerce verso.jpg.jpeg` },
  { name: "PEDROSO TÊXTIL", category: "INDÚSTRIA TÊXTIL", image: `${media}/pedroso textil.jpg.jpeg` },
  { name: "BETINI'S", category: "INDÚSTRIA TÊXTIL", image: `${media}/betini´s.jpg.jpeg` },
  { name: "FÊNIX TÊXTIL", category: "INDÚSTRIA TÊXTIL", image: `${media}/fenix textil.jpg.jpeg` },
  { name: "TW PRINT", category: "ESTAMPARIA", image: `${media}/tw print.jpg.jpeg` },
  { name: "MARGIS TRANSPORTES", category: "TRANSPORTADORA", image: `${media}/margis.jpg.jpeg` },
  { name: "MOURA MALHAS", category: "INDÚSTRIA TÊXTIL", image: `${media}/moura.jpg.jpeg` },
  { name: "FINAL Z", category: "INDÚSTRIA TÊXTIL", image: `${media}/finalz.jpg.jpeg` },
  { name: "YGUAÇU MÁQUINAS", category: "MAQUINÁRIO", image: `${media}/yguacu.jpg.jpeg` },
  { name: "HR TÊXTIL", category: "INDÚSTRIA TÊXTIL", image: `${media}/hr.jpg.jpeg` },
  { name: "MECOLOUR", category: "IMPRESSÃO", image: `${media}/mecolour.jpg.jpeg` },
  { name: "MAQCENTER", category: "MAQUINÁRIO", image: `${media}/maqcenter.jpg.jpeg` },
  { name: "BM DO BRASIL", category: "MAQUINÁRIO", image: `${media}/bm do brasil.jpg.jpeg` },
  { name: "MAGNA TECH", category: "MAQUINÁRIO", image: `${media}/magnatech.jpg.jpeg` },
  { name: "CONTÁBIL ZANONE", category: "CONTABILIDADE", image: `${media}/zanonecontabil.jpg.jpeg` },
  { name: "ZANONE CURSOS", category: "CURSOS", image: `${media}/zanone cursos.jpg.jpeg` },
  { name: "ZANONE MALHAS", category: "INDÚSTRIA TÊXTIL", image: `${media}/zanone.jpg.jpeg` },
];
