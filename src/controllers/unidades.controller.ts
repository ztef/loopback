import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';

import {Unidades} from '../models';
import {UnidadesRepository} from '../repositories';

export class UnidadesController {
  constructor(
    @repository(UnidadesRepository)
    public unidadesRepository: UnidadesRepository,
  ) { }

  @post('/unidades')
  @response(200, {
    description: 'Unidades model instance',
    content: {'application/json': {schema: getModelSchemaRef(Unidades)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unidades, {
            title: 'NewUnidades',
            exclude: ['id'],
          }),
        },
      },
    })
    unidades: Omit<Unidades, 'id'>,
  ): Promise<Unidades> {
    return this.unidadesRepository.create(unidades);
  }

  @get('/unidades/count')
  @response(200, {
    description: 'Unidades model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Unidades) where?: Where<Unidades>,
  ): Promise<Count> {
    return this.unidadesRepository.count(where);
  }

  @get('/unidades')
  @response(200, {
    description: 'Array of Unidades model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Unidades, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Unidades) filter?: Filter<Unidades>,
  ): Promise<Unidades[]> {
    console.log("LISTANDO FILTRO :");

    return this.unidadesRepository.find(filter);
  }

  @patch('/unidades')
  @response(200, {
    description: 'Unidades PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unidades, {partial: true}),
        },
      },
    })
    unidades: Unidades,
    @param.where(Unidades) where?: Where<Unidades>,
  ): Promise<Count> {
    return this.unidadesRepository.updateAll(unidades, where);
  }

  @get('/unidades/{id}')
  @response(200, {
    description: 'Unidades model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Unidades, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Unidades, {exclude: 'where'}) filter?: FilterExcludingWhere<Unidades>
  ): Promise<Unidades> {
    return this.unidadesRepository.findById(id, filter);
  }

  @patch('/unidades/{id}')
  @response(204, {
    description: 'Unidades PATCH success',
  })
  async updateById(


    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unidades, {partial: true}),
        },
      },
    })
    unidades: Unidades,
  ): Promise<void> {


    await this.unidadesRepository.updateById(id, unidades);
  }

  @put('/unidades/{id}')
  @response(204, {
    description: 'Unidades PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() unidades: Unidades,
  ): Promise<void> {


    await this.unidadesRepository.replaceById(id, unidades);
  }

  @del('/unidades/{id}')
  @response(204, {
    description: 'Unidades DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.unidadesRepository.deleteById(id);
  }
}
