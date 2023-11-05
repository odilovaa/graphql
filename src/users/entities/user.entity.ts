import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "../../post/entities/post.entity";

@ObjectType()
@Entity('users')
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true})
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @CreateDateColumn()
    createAt: Date;

    @Field()
    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany((type) => Posts, (posts) => posts.author)
    @Field((type) => [Posts])
    posts: Posts[]
}
