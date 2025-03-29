using FluentValidation;

namespace Curotec.Store.Business.Models.Validations
{
    public class AddressValidation : AbstractValidator<Address>
    {
        public AddressValidation()
        {
            RuleFor(c => c.Address1)
                .NotEmpty().WithMessage("The field {PropertyName} must be provided")
                .Length(2, 200).WithMessage("The field {PropertyName} must be between {MinLength} and {MaxLength} characters long");

            RuleFor(c => c.Address2)
                .NotEmpty().WithMessage("The field {PropertyName} must be provided")
                .Length(2, 100).WithMessage("The field {PropertyName} must be between {MinLength} and {MaxLength} characters long");

            RuleFor(c => c.ZipCode)
                .NotEmpty().WithMessage("The field {PropertyName} must be provided")
                .Length(8).WithMessage("The field {PropertyName} must be {MaxLength} characters long");

            RuleFor(c => c.City)
                .NotEmpty().WithMessage("The field {PropertyName} must be provided")
                .Length(2, 100).WithMessage("The field {PropertyName} must be between {MinLength} and {MaxLength} characters long");

            RuleFor(c => c.State)
                .NotEmpty().WithMessage("The field {PropertyName} must be provided")
                .Length(2, 50).WithMessage("The field {PropertyName} must be between {MinLength} and {MaxLength} characters long");


        }

    }
}
