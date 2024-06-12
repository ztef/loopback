import {Entity, model, property} from '@loopback/repository';

@model()
export class Unidades extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: false,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  num_unidad: string;

  @property({
    type: 'string',
  })
  marca?: string;

  @property({
    type: 'string',
    required: false,
  })
  clase: string;

  @property({
    type: 'string',
  })
  estatus?: string;

  @property({
    type: 'number',
  })
  category?: number;


  constructor(data?: Partial<Unidades>) {
    super(data);
  }
}

export interface UnidadesRelations {
  // describe navigational properties here
}

export type UnidadesWithRelations = Unidades & UnidadesRelations;
