DROP TABLE "deputados";

CREATE TABLE "deputados" (
"id" int4 NOT NULL,
"nome" varchar(255),
"sigla_partido" varchar(255),
"uri_partido" varchar(255),
"sigla_uf" varchar(255),
"id_legislatura" varchar(255),
"url_foto" varchar(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
