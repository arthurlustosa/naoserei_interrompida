# encoding=utf-8

import requests
import psycopg2

def inserirDeputados(data):
    for deputado in data['dados']:
        try:
            conn = psycopg2.connect("dbname='hackfest' user='victorximenis' host='localhost' password='pf13.500'")
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        cur = conn.cursor()

        try:
            sql = "INSERT INTO deputados (id, nome, sigla_partido, uri_partido, sigla_uf, id_legislatura, url_foto) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}');".format(deputado['id'], deputado['nome'].encode('UTF-8'), deputado['siglaPartido'], deputado['uriPartido'], deputado['siglaUf'], deputado['idLegislatura'], deputado['urlFoto'])
            print sql
            cur.execute(sql)
            conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        
        cur.close()
        conn.close()

def inserirDeputadoDetalhes(detalhes):
    try:
        conn = psycopg2.connect("dbname='hackfest' user='victorximenis' host='localhost' password='pf13.500'")
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    cur = conn.cursor()

    try:
        sql = "INSERT INTO deputados_detalhes (nome_civil ,cpf ,sexo ,url_website ,rede_social ,data_nascimento ,data_falecimento ,uf_nascimento ,municipio_nascimento ,escolaridade, id_deputado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        print sql
        cur.execute(sql, (detalhes['nomeCivil'], detalhes['cpf'], detalhes['sexo'], detalhes['urlWebsite'], '', detalhes['dataNascimento'], '', detalhes['ufNascimento'], detalhes['municipioNascimento'], detalhes['escolaridade'], detalhes['id']))
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
    cur.close()
    conn.close()


def requestDeputados(pagina):
    URL = "https://dadosabertos.camara.leg.br/api/v2/deputados"

    PARAMS = { 'ordem':  'ASC', 'ordenarPor': 'nome', 'pagina': pagina, 'itens': '50'}

    r = requests.get(URL, PARAMS)

    data = r.json()

    inserirDeputados(data)

    if (data['links'][1] is not None and data['links'][1]['rel'] == "next"):
        requestDeputados(pagina + 1)

def requestDeputadosDetalhes():
    try:
        conn = psycopg2.connect("dbname='hackfest' user='victorximenis' host='localhost' password='pf13.500'")
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    cur = conn.cursor()

    try:
        sql = "SELECT id FROM deputados;"
        print sql
        cur.execute(sql)
        deputados = cur.fetchall()
        
        for res in deputados:
            URL = "https://dadosabertos.camara.leg.br/api/v2/deputados/" + str(res[0])
            r = requests.get(URL)
            data = r.json()

            inserirDeputadoDetalhes(data['dados'])

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
    cur.close()
    conn.close()

def requestPropositurasDeputado(conn, cur, res, pagina):
    URL = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/"

    PARAMS = { 'idAutor':  res[0], 'ordem': 'ASC', 'ordenarPor': 'id', 'pagina': pagina, 'itens': '50'}
    r = requests.get(URL, PARAMS)
    data = r.json()

    for propositura in data['dados']:
        try:
            sql = "INSERT INTO proposituras (id, uri, sigla_tipo, id_tipo, numero, ano, ementa, id_deputado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
            print sql
            cur.execute(sql, (int(propositura['id']), propositura['uri'].encode('UTF-8'), propositura['siglaTipo'].encode('UTF-8'), propositura['idTipo'], propositura['numero'], propositura['ano'], propositura['ementa'].encode('UTF-8'), int(res[0])))
            conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
    
    if (data['links'][1] is not None and data['links'][1]['rel'] == "next"):
        requestPropositurasDeputado(conn, cur, res, pagina + 1)

def requestProposituraDetalhe(conn, cur, res):
    URL = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/" + str(res[0])
    r = requests.get(URL)
    data = r.json()
    propositura = data['dados']

    try:
        sql = "INSERT INTO proposituras_detalhes (id_situacao, data_apresentacao, data_hora_status, descricao_situacao, descricao_tramitacao, sigla_orgao, despacho, id_propositura) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
        print sql
        cur.execute(sql, (propositura['statusProposicao']['idSituacao'], propositura['dataApresentacao'], propositura['statusProposicao']['dataHora'], propositura['statusProposicao']['descricaoSituacao'], propositura['statusProposicao']['descricaoTramitacao'], propositura['statusProposicao']['siglaOrgao'], propositura['statusProposicao']['despacho'], res[0]))
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
def requestProposituras():
    try:
        conn = psycopg2.connect("dbname='hackfest' user='victorximenis' host='localhost' password='pf13.500'")
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    cur = conn.cursor()

    try:
        sql = "SELECT id FROM deputados;"
        print sql
        cur.execute(sql)
        deputados = cur.fetchall()
        
        for res in deputados:
            requestPropositurasDeputado(conn, cur, res, 1)

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
    conn.commit()
    cur.close()
    conn.close()

def requestPropositurasDetalhes():
    try:
        conn = psycopg2.connect("dbname='hackfest' user='victorximenis' host='localhost' password='pf13.500'")
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    cur = conn.cursor()

    try:
        sql = "SELECT id FROM proposituras;"
        print sql
        cur.execute(sql)
        deputados = cur.fetchall()
        
        for res in deputados:
            requestProposituraDetalhe(conn, cur, res)

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
    conn.commit()
    cur.close()
    conn.close()

def inserirGastosDeputado(conn, cur, id_deputado, pagina):
    URL = "https://dadosabertos.camara.leg.br/api/v2/deputados/" + str(id_deputado) + "/despesas"

    PARAMS = { 'ordem': 'ASC', 'ordenarPor': 'ano', 'pagina': pagina, 'itens': '50'}
    r = requests.get(URL, PARAMS)
    data = r.json()

    for gasto in data['dados']:
        try:
            sql = "INSERT INTO gastos (id_documento, ano, mes, tipo_documento, id_tipo_documento, data_documento, num_documento, valor_documento, url_documento, nome_fornecedor, cnpj_cpf_fornecedor, valor_liquido, valor_glosa, num_ressarcimento, id_lote, parcela, id_deputado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            print sql
            cur.execute(sql, (gasto['idDocumento'], gasto['ano'], gasto['mes'], gasto['tipoDocumento'], gasto['idTipoDocumento'], gasto['dataDocumento'], gasto['numDocumento'], gasto['valorDocumento'], gasto['urlDocumento'], gasto['nomeFornecedor'], gasto['cnpjCpfFornecedor'], gasto['valorLiquido'], gasto['valorGlosa'], gasto['numRessarcimento'], gasto['idLote'], gasto['parcela'], id_deputado))
            conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    if (data['links'][1] is not None and data['links'][1]['rel'] == "next"):
        inserirGastosDeputado(conn, cur, id_deputado, pagina + 1)

def requestGastos():
    try:
        conn = psycopg2.connect("dbname='hackfest' user='victorximenis' host='localhost' password='pf13.500'")
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    cur = conn.cursor()

    try:
        sql = "SELECT id FROM deputados;"
        print sql
        cur.execute(sql)
        deputados = cur.fetchall()
        
        for res in deputados:
            inserirGastosDeputado(conn, cur, res[0], 1)

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    
    conn.commit()
    cur.close()
    conn.close()

requestDeputados(1)
requestDeputadosDetalhes()
requestProposituras()
requestPropositurasDetalhes()
requestGastos()