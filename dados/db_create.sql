ALTER TABLE "deputados_detalhes" DROP CONSTRAINT "fk_deputados";
ALTER TABLE "proposituras" DROP CONSTRAINT "fk_propositura_deputado";
ALTER TABLE "proposituras_detalhes" DROP CONSTRAINT "fk_proposituras_detalhes_proposituras";
ALTER TABLE "gastos" DROP CONSTRAINT "fk_gastos_deputado";

DROP TABLE "deputados";
DROP TABLE "deputados_detalhes";
DROP TABLE "proposituras";
DROP TABLE "proposituras_detalhes";
DROP TABLE "gastos";

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
CREATE TABLE "deputados_detalhes" (
"nome_civil" varchar(255),
"cpf" varchar(255),
"sexo" varchar(255),
"url_website" varchar(255),
"rede_social" varchar(255),
"data_nascimento" varchar(255),
"data_falecimento" varchar(255),
"uf_nascimento" varchar(255),
"municipio_nascimento" varchar(255),
"escolaridade" varchar(255),
"id_deputado" int4 NOT NULL
)
WITHOUT OIDS;
CREATE TABLE "proposituras" (
"id" int4 NOT NULL,
"uri" varchar(255),
"sigla_tipo" varchar(255),
"id_tipo" varchar(255),
"numero" varchar(255),
"ano" int4,
"ementa" text,
"id_deputado" int4,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
CREATE TABLE "proposituras_detalhes" (
"id_situacao" varchar(255),
"data_apresentacao" varchar(255),
"data_hora_status" varchar(255),
"descricao_situacao" text,
"descricao_tramitacao" text,
"sigla_orgao" varchar(255),
"despacho" text,
"id_propositura" int4
)
WITHOUT OIDS;
CREATE TABLE "gastos" (
"id_documento" varchar(255) NOT NULL,
"ano" int4,
"mes" int4,
"tipo_documento" varchar(255),
"id_tipo_documento" varchar(255),
"data_documento" varchar(255),
"num_documento" varchar(255),
"valor_documento" varchar(255),
"url_documento" varchar(255),
"nome_fornecedor" varchar(255),
"cnpj_cpf_fornecedor" varchar(255),
"valor_liquido" varchar(255),
"valor_glosa" varchar(255),
"num_ressarcimento" varchar(255),
"id_lote" varchar(255),
"parcela" varchar(255),
"id_deputado" int4
)
WITHOUT OIDS;

ALTER TABLE "deputados_detalhes" ADD CONSTRAINT "fk_deputados" FOREIGN KEY ("id_deputado") REFERENCES "deputados" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "proposituras" ADD CONSTRAINT "fk_propositura_deputado" FOREIGN KEY ("id_deputado") REFERENCES "deputados" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "proposituras_detalhes" ADD CONSTRAINT "fk_proposituras_detalhes_proposituras" FOREIGN KEY ("id_propositura") REFERENCES "proposituras" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "gastos" ADD CONSTRAINT "fk_gastos_deputado" FOREIGN KEY ("id_deputado") REFERENCES "deputados" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

