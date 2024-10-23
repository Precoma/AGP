package br.com.api.agenda.controller;

import br.com.api.agenda.model.Customer;
import br.com.api.agenda.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*") 
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @GetMapping("/all")
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/get")
    public Customer getCustomer(@RequestParam(name = "email") String email,
                                @RequestParam(name = "password") String password) {
        return customerService.getCustomer(email,password);
    }

    @GetMapping("/getProfessorStatus")
    public Boolean getProfessorStatus(@RequestParam(name = "email") String email,
                                  @RequestParam(name = "password") String password) {
    try {
        Customer customer = customerService.getCustomer(email, password);
        System.out.println("Cliente encontrado: " + customer);
        System.out.println("Ele é professor? " + customer.getIsProfessor());
        
        return customer != null && customer.getIsProfessor(); // Retorna true ou false
    } catch (Exception e) {
        System.err.println("Erro ao obter status do professor: " + e.getMessage());
        return false; // ou lançar uma exceção
    }
                                  }

    @PostMapping("/add")
    public void registerNewCustomer(@RequestBody Customer customer) {
        System.out.println("Recebido: " + customer);
        customerService.addNewCustomer(customer);
    }

    @DeleteMapping("/delete")
    public void deleteCustomerByEmail(@RequestParam(name = "email") String email) {
        customerService.deleteCustomerByEmail(email);
    }
}
