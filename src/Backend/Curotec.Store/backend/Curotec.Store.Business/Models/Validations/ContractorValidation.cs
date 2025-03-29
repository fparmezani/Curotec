using FluentValidation;

namespace Curotec.Store.Business.Models.Validations
{
    public class ContractorValidation : AbstractValidator<Contractor>
    {
        public ContractorValidation()
        {
            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("The field {PropertyName} must be provided")
                .Length(2, 100)
                .WithMessage("The field {PropertyName} must be between {MinLength} and {MaxLength} characters long");

        }
    }
}
