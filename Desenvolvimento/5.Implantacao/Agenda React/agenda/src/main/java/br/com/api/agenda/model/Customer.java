package br.com.api.agenda.model;

import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity

public class Customer {

    @Id
    @SequenceGenerator(
            name = "customer_sequence",
            sequenceName = "customer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "customer_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Boolean isProfessor;

}