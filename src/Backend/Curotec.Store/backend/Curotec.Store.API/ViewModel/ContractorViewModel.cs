﻿using System.ComponentModel.DataAnnotations;

namespace Curotec.Store.API.ViewModel
{
    public class ContractorViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(100, ErrorMessage = "The field {0} must be between {2} and {1} characters", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(14, ErrorMessage = "The field {0} must be between {2} and {1} characters", MinimumLength = 11)]
        public string Document { get; set; }

        public AddressViewModel Address { get; set; }

        public bool Active { get; set; }

        public IEnumerable<ProductViewModel> Products { get; set; }
    }

}
