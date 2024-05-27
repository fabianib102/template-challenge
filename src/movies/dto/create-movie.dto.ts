import { IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    plot: string;

    @IsNotEmpty()
    @IsNumber()
    year: number
}
