import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  answer: any;
  step: number;
  perguntas: any;
  indicesLimpar: any;

  constructor() { }

  ngOnInit() {
    this.answer = false;
    this.step = 1;
    this.indicesLimpar = [];
    this.perguntas = [
      {texto: 'Qual o grau de escolaridade da maioria das deputadas que compõem a Câmara?', idxResposta: 3, opcoes: [
          {idx: 1, texto: 'Ensino Médio Completo'},
          {idx: 2, texto: 'Ensino Superior Incompleto'},
          {idx: 3, texto: 'Ensino Superior Completo'},
          {idx: 4, texto: 'Pós-graduação'}
        ],
        explanation: 'Dentre as deputadas, 60% têm Ensino Superior Completo, e 20% possuem alguma Pós-Graduação. A maioria declarou que é professora ou advogada como formação'
      },
      {texto: 'Qual o percentual de mulheres na Câmara dos Deputados?', idxResposta: 1, opcoes: [
          {idx: 1, texto: '10% do total'},
          {idx: 2, texto: '23% do total'},
          {idx: 3, texto: '30% do total'},
          {idx: 4, texto: '62% do total'}
        ],
        explanation: 'Apesar da atualização da Lei no 9.504/1997 em 2009, obrigando os partidos a destinar 30% das candidaturas ao legislativo para mulheres, a proporção delas na câmara dos deputados ainda é muito baixa. Além de não refletir os 53% de mulheres na população brasileira, infelizmente essa obrigatoriedade fez com que a maioria das candidaturas de mulheres fossem fantasma, apenas para cumprir a cota exigida por lei'
      },
      {texto: 'Qual a porcentagem de proposituras feitas por mulheres que chega a ser aprovada?', idxResposta: 1, opcoes: [
          {idx: 1, texto: 'Menos de 10%'},
          {idx: 2, texto: '18%'},
          {idx: 3, texto: '36%'},
          {idx: 4, texto: '47%'}
        ],
        explanation: 'No período de 1995 a 2018, das 5.504 propostas apresentadas por mulheres na Câmara, 857 foram arquivadas, o que representa 15% do total'
      },
      {texto: 'Quando foi eleita a primeira mulher na câmara?', idxResposta: 1, opcoes: [
          {idx: 1, texto: '1933'},
          {idx: 2, texto: '1960'},
          {idx: 3, texto: '1989'},
          {idx: 4, texto: '2010'}
        ],
        explanation: 'Em 1933 realizam-se as primeiras eleições em que se permite o voto às mulheres. A primeira mulher a ser eleita deputada foi a médica Carlota Pereira de Queiróz, que havia participado ativamente da Revolução Constitucionalista. Para o cargo de Presidente, a primeira candidatura registrada por uma mulher ocorreu em 1989, e apenas em 2010 uma mulher foi eleita'
      },
      {texto: 'Qual a porcentagem das mulheres que se candidatam que são eleitas?', idxResposta: 1, opcoes: [
          {idx: 1, texto: '2%'},
          {idx: 2, texto: '10%'},
          {idx: 3, texto: '30%'},
          {idx: 4, texto: '40%'}
        ],
        explanation: 'Nas eleições gerais de 2014, 2583 mulheres registraram candidatura para o cargo de Deputada Federal e apenas 53 foram bem-sucedidas, o que corresponde a 2% do total'
      },
      {texto: 'Qual a porcentagem de deputadas sendo investigadas por alguma irregularidade?', idxResposta: 3, opcoes: [
          {idx: 1, texto: 'Menos de 10%'},
          {idx: 2, texto: '20%'},
          {idx: 3, texto: '28%'},
          {idx: 4, texto: '37%'}
        ],
        explanation: 'Descrição: 15 das 53 mulheres estão sendo investigadas, duas delas por por ações penais (processos que podem acabar em condenação) e o restante respondem na justiça por inquéritos (procedimentos que podem resultar em processos), podendo ser incluídas na Lei da Ficha Limpa'
      },
      {texto: 'No ranking mundial, qual a posição do Brasil em número de mulheres no Parlamento?', idxResposta: 3, opcoes: [
          {idx: 1, texto: '43º'},
          {idx: 2, texto: '60º'},
          {idx: 3, texto: '153º'},
          {idx: 4, texto: '175º'}
        ],
        explanation: 'O Brasil fica atrás, em termos de participação de mulheres em Parlamentos, de países como a Jordânia, Síria, Somália, Líbia, Marrocos, Indonésia, Iraque, Paquistão, Afeganistão, Tunísia, Emirados Árabes e mesmo a Arábia Saudita, com 19% de assentos no Congresso reservados para as mulheres'
      },
      {texto: 'Qual a média de idade das mulheres na Câmara dos Deputados?', idxResposta: 3, opcoes: [
          {idx: 1, texto: '27'},
          {idx: 2, texto: '39'},
          {idx: 3, texto: '54'},
          {idx: 4, texto: '65'}
        ],
        explanation: 'A idade média das mulheres eleitas é de 54,09, sendo 69 anos a idade mais comum. Os homens tem XX anos de média, sendo mais comum XX anos. \n' +
                      'Mais nova - BRUNIELE FERREIRA GOMES 28\n' +
                      'Mais velha - LUIZA ERUNDINA DE SOUSA    83 anos\n'
      },
      {texto: '', idxResposta: 3, opcoes: [
          {idx: 1, texto: 'Ensino Médio Completo'},
          {idx: 2, texto: 'Ensino Superior Incompleto'},
          {idx: 3, texto: 'Ensino Superior Completo'},
          {idx: 4, texto: 'Pós-graduação'}
        ]
      },
      {texto: '', idxResposta: 3, opcoes: [
          {idx: 1, texto: 'Ensino Médio Completo'},
          {idx: 2, texto: 'Ensino Superior Incompleto'},
          {idx: 3, texto: 'Ensino Superior Completo'},
          {idx: 4, texto: 'Pós-graduação'}
        ]
      }
    ];
  }

  clickResposta(idx, p) {
    if (!this.answer) {
      this.answer = true;
      if (idx === p.idxResposta) {
        $('#card-resp-' + idx).toggleClass('card-resposta-success');
        this.indicesLimpar[this.indicesLimpar.length] = {idx: idx, class: 'card-resposta-success'};
      } else {
        $('#card-resp-' + p.idxResposta).toggleClass('card-resposta-success');
        $('#card-resp-' + idx).toggleClass('card-resposta-danger');
        this.indicesLimpar[this.indicesLimpar.length] = {idx: idx, class: 'card-resposta-danger'};
        this.indicesLimpar[this.indicesLimpar.length] = {idx: p.idxResposta, class: 'card-resposta-success'};
      }
      $('#resposta').show();
    }
  }

  clickProximo() {
    this.answer = false;
    if (this.step < 10) {
      $('#nav' + this.step).hide();
      this.step++;
      $('#resposta').hide();
      $('#nav' + this.step).show();
      for (let elem of this.indicesLimpar) {
        $('#card-resp-' + elem.idx).toggleClass(elem.class);
      }
      this.indicesLimpar = [];
    }
  }

}
