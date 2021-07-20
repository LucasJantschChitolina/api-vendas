import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}
class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const curstomersRepository = getCustomRepository(CustomersRepository);

    const customer = await curstomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await curstomersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
