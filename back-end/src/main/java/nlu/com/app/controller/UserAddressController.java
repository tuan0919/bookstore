package nlu.com.app.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.dto.request.UserAddressDto;
import nlu.com.app.service.IUserAddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/addresses")
@RequiredArgsConstructor
public class UserAddressController {

  private final IUserAddressService userAddressService;

  @GetMapping
  public AppResponse<List<UserAddressDto>> getUserAddresses() {
    return AppResponse.<List<UserAddressDto>>builder()
        .result(userAddressService.getCurrentUserAddresses()).build();

  }

  @PostMapping
  public AppResponse<UserAddressDto> addUserAddress(@RequestBody AddressDto addressDto) {
    return AppResponse.<UserAddressDto>builder().result(userAddressService.addAddressForCurrentUser(addressDto)).build();
  }

  @PutMapping("/{userAddressId}")
  public AppResponse<UserAddressDto> updateAddress(@PathVariable Long userAddressId,
      @RequestBody AddressDto addressDto,
      @RequestParam(required = false) Boolean makeDefault) {
    return AppResponse.<UserAddressDto>builder()
        .result(userAddressService.updateUserAddress(userAddressId, addressDto, makeDefault))
        .build();
  }
}

