class Routercomponent{
    constructor(){}
    Home(resolve){
        return require(['../views/Home/Home'],resolve)
    }
    Detail(resolve){
        return require(['../views/Detail/Detail'],resolve)
    }
}
export default new Routercomponent();