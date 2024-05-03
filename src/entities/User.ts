import { Entity, Column } from "typeorm"
import { CloudBaseEntity } from "./CloudBaseEntity.js"

const randomUUID = crypto.randomUUID();
@Entity()
export class User extends CloudBaseEntity {

    @Column("varchar", {nullable: false})
    username!: string

    @Column("varchar", {nullable: false})
    password!: string

    @Column("varchar", {nullable: false})
    first_name!: string

    @Column("varchar", {nullable: false})
    last_name!: string

    @Column("boolean", {default: false, nullable: false})
    validated!: boolean

    @Column({ type: "timestamp without time zone", nullable: true} )
    validity: Date;

    @Column("varchar", {default : `${randomUUID}` , nullable: false})
    validityToken!: string

}
