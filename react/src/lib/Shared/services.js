import UseList from "@/lib/List/app/UseList";
import ListRepository from "@/lib/List/domain/ListRepository";
import LocalStorageService from "@/lib/List/infra/services/LocalStorageService";

const ListLocalStorageRepository = new ListRepository(new LocalStorageService('listed-items'))

const Services = {
    List: new UseList(ListLocalStorageRepository)
}

export default Services