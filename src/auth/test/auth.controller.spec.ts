import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { ROLES } from '../enum/roles';

const mockAuthService = {
  register: jest.fn().mockResolvedValue('registered'),
  login: jest.fn().mockResolvedValue('logged in'),
};

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [AuthController],
          providers: [
            {
              provide: AuthService,
              useValue: mockAuthService,
            },
          ],
        }).compile();
    
        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
      });
    
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('registerUser', () => {
        it('should register a user', async () => {
            const registerAuthDto: RegisterAuthDto = {
                name: 'testuser',
                email: 'email@gmail.com',
                password: 'testpassword',
                role: ROLES.ADMIN
            };
            const result = await controller.registerUser(registerAuthDto);
            expect(result).toEqual('registered');
            expect(service.register).toHaveBeenCalledWith(registerAuthDto);
        });
    });

    describe('loginUser', () => {
        it('should login a user', async () => {
          const loginAuthDto: LoginAuthDto = {
            email: 'testuser',
            password: 'testpassword',
          };
          const result = await controller.loginUser(loginAuthDto);
          expect(result).toEqual('logged in');
          expect(service.login).toHaveBeenCalledWith(loginAuthDto);
        });
    });
})