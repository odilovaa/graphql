import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateProductDto {
    @Field({ nullable: true})
    name: string;

    @Field()
    price: string;

}
