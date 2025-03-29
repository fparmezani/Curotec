namespace Curotec.Store.Business.Models
{
    public class Product: Entity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Active { get; set; }

        /* EF Relations */
        public Guid ContractorId { get; set; }
        public Contractor Contractor { get; set; } = default!;
    }
}
