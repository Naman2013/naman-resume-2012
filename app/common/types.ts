export interface Action<P> {
  type: string;
  payload?: P;
}

export interface IRouter<Params> {
  params: Params;
  routeParams: Params;
  route: any;
  router: any;
  routes: any[];
}
