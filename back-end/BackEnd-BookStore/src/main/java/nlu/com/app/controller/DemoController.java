package nlu.com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    @GetMapping("/greet")
    public String greet() {
        return "Hello, if you're here it's mean you're success to login";
    }
}
