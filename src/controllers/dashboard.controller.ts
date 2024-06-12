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


import {Categories} from '../models';
import {CategoriesRepository} from '../repositories';
import {Unidades} from '../models';
import {UnidadesRepository} from '../repositories';

export class DashboardController {
  constructor(
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
    @repository(UnidadesRepository)
    public unidadesRepository: UnidadesRepository,
  ) { }



  @get('/dashboard/count')
  @response(200, {
    description: 'Dashboard count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(

  ): Promise<Object> {

    const whereCategories: Where<Categories> = {};
    const whereUnidades: Where<Unidades> = {};
    const whereUnidadesOK: Where<Unidades> = {estatus: "Funciona"};



    let categories_count = this.categoriesRepository.count(whereCategories);
    let unidades_count = this.unidadesRepository.count(whereUnidades);
    let unidades_ok_count = this.unidadesRepository.count(whereUnidadesOK);


    let totals = {categories: 0, unidades: 0, unidades_ok: 0};
    totals.categories = (await categories_count).count;
    totals.unidades = (await unidades_count).count;
    totals.unidades_ok = (await unidades_ok_count).count;

    return totals;

  }





}
